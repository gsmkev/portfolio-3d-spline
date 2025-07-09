// Servicio para manejo de audio y efectos de sonido
class AudioService {
  constructor() {
    this.audioContext = null;
    this.notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  }

  // Inicializar contexto de audio
  initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  // Reproducir música (simulada)
  playMusic() {
    // Aquí puedes agregar lógica real de reproducción de música
    // Por ejemplo, cargar y reproducir un archivo de audio
  }

  // Tocar notas de guitarra
  playGuitarNotes() {
    const randomNote = this.notes[Math.floor(Math.random() * this.notes.length)];
    
    // Aquí puedes agregar lógica real para generar tonos de guitarra
    // usando Web Audio API
    this.initAudioContext();
    
    // Ejemplo básico de generación de tono
    this.generateTone(randomNote);
  }

  // Generar tono para una nota específica
  generateTone(note) {
    if (!this.audioContext) return;

    const frequencies = {
      'C': 261.63,
      'D': 293.66,
      'E': 329.63,
      'F': 349.23,
      'G': 392.00,
      'A': 440.00,
      'B': 493.88
    };

    const frequency = frequencies[note];
    if (!frequency) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.5);
  }

  // Detener todo el audio
  stopAllAudio() {
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}

// Exportar instancia singleton
export const audioService = new AudioService(); 