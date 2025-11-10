import type { ConversationMessage } from '../types'

const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY
const DEEPSEEK_API_URL = import.meta.env.VITE_DEEPSEEK_API_URL || 'https://api.deepseek.com/v1'

export class DeepseekService {
  static async chat(messages: ConversationMessage[], systemPrompt?: string): Promise<string> {
    if (!DEEPSEEK_API_KEY) {
      console.warn('Deepseek API key not configured')
      return 'AI service is not configured. Please add your API key.'
    }

    try {
      const formattedMessages = [
        ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
        ...messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      ]

      const response = await fetch(`${DEEPSEEK_API_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: formattedMessages,
          temperature: 0.7,
          max_tokens: 500,
        }),
      })

      if (!response.ok) {
        throw new Error(`Deepseek API error: ${response.statusText}`)
      }

      const data = await response.json()
      return data.choices[0]?.message?.content || 'Sorry, I could not generate a response.'
    } catch (error) {
      console.error('Error calling Deepseek API:', error)
      return 'An error occurred while processing your message.'
    }
  }

  static async evaluateConversation(
    messages: ConversationMessage[],
    scenario: string
  ): Promise<{
    score: number
    strengths: string[]
    improvements: string[]
  }> {
    const evaluationPrompt = `
You are evaluating a Kyrgyz language learning conversation practice session.
Scenario: ${scenario}

Conversation:
${messages.map((msg) => `${msg.role}: ${msg.content}`).join('\n')}

Provide a JSON response with:
- score (0-100): Overall performance
- strengths (array of strings): What the learner did well
- improvements (array of strings): Areas for improvement

Focus on: vocabulary usage, grammar, relevance to scenario, conversational flow.
    `

    try {
      const response = await this.chat(
        [{ role: 'user', content: evaluationPrompt, timestamp: new Date().toISOString() }],
        'You are a language learning expert.'
      )

      const jsonMatch = response.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }

      return {
        score: 70,
        strengths: ['Good effort!'],
        improvements: ['Keep practicing!'],
      }
    } catch (error) {
      console.error('Error evaluating conversation:', error)
      return {
        score: 70,
        strengths: ['Completed the conversation'],
        improvements: ['Continue practicing regularly'],
      }
    }
  }

  static async translateText(text: string, direction: 'en-to-ky' | 'ky-to-en'): Promise<string> {
    const systemPrompt =
      direction === 'en-to-ky'
        ? 'You are a translator. Translate the following English text to Kyrgyz. Only respond with the translation, no explanations.'
        : 'You are a translator. Translate the following Kyrgyz text to English. Only respond with the translation, no explanations.'

    return this.chat(
      [{ role: 'user', content: text, timestamp: new Date().toISOString() }],
      systemPrompt
    )
  }
}
