const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY
const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1'

export class ElevenLabsService {
  private static voiceId = 'EXAVITQu4vr4xnSDxMaL' // Default voice - Sarah

  static async textToSpeech(text: string, voiceId?: string): Promise<string> {
    if (!ELEVENLABS_API_KEY) {
      console.warn('ElevenLabs API key not configured')
      return ''
    }

    try {
      const response = await fetch(
        `${ELEVENLABS_API_URL}/text-to-speech/${voiceId || this.voiceId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': ELEVENLABS_API_KEY,
          },
          body: JSON.stringify({
            text,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
            },
          }),
        }
      )

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.statusText}`)
      }

      const audioBlob = await response.blob()
      return URL.createObjectURL(audioBlob)
    } catch (error) {
      console.error('Error generating speech:', error)
      return ''
    }
  }

  static async getVoices() {
    if (!ELEVENLABS_API_KEY) {
      return []
    }

    try {
      const response = await fetch(`${ELEVENLABS_API_URL}/voices`, {
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY,
        },
      })

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.statusText}`)
      }

      const data = await response.json()
      return data.voices
    } catch (error) {
      console.error('Error fetching voices:', error)
      return []
    }
  }

  static preloadAudio(url: string): HTMLAudioElement {
    const audio = new Audio(url)
    audio.preload = 'auto'
    return audio
  }

  static playAudio(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const audio = new Audio(url)
      audio.onended = () => resolve()
      audio.onerror = reject
      audio.play()
    })
  }
}
