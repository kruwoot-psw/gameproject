let voiceEnabled = true;

export function toggleVoice() {
  voiceEnabled = !voiceEnabled;
  return voiceEnabled;
}

export function speak(text) {
  if (!voiceEnabled || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'th-TH';
  u.rate = 1.0;
  window.speechSynthesis.speak(u);
}