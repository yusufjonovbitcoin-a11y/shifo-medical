export function createInitialState() {
  return {
    symptoms: [],
    startedAt: null,
    duration: null,
    severity: null,
    location: null,
    extraSymptoms: [],
    age: null,
    suggestedDoctor: null,
    redFlag: false,
    phone: null,
    completed: false
  };
}

export function updateStateFromMessage(state, message, aiReply) {
  const updated = { ...state };
  const lowerMessage = message.toLowerCase();
  const lowerReply = aiReply.toLowerCase();

  if (!updated.symptoms.length) {
    const symptomKeywords = ['og\'riq', 'ogriq', 'kasal', 'shikoyat', 'alamat', 'bezovta', 'muammo', 'dardi'];
    if (symptomKeywords.some(kw => lowerMessage.includes(kw))) {
      updated.symptoms.push(message);
    }
  }

  if (!updated.startedAt) {
    const timeMatch = message.match(/(\d+\s*(?:kundan|kun|haftadan|hafta|oydan|oy)\s*beri|\d+\s*(?:kun|hafta|oy)\s*davom|bugun|kecha|ertaga)/i);
    if (timeMatch) {
      updated.startedAt = timeMatch[0];
    }
  }

  if (!updated.duration) {
    const durationMatch = message.match(/(\d+\s*(?:kundan|kun|haftadan|hafta|oydan|oy)\s*beri|\d+\s*(?:kun|hafta|oy)\s*davom)/i);
    if (durationMatch) {
      updated.duration = durationMatch[0];
    }
  }

  if (!updated.severity) {
    if (lowerMessage.includes('yengil') || lowerMessage.includes('yengil')) {
      updated.severity = 'Yengil';
    } else if (lowerMessage.includes('o\'rtacha') || lowerMessage.includes('ortacha')) {
      updated.severity = 'O\'rtacha';
    } else if (lowerMessage.includes('kuchli') || lowerMessage.includes('jiddiy')) {
      updated.severity = 'Kuchli';
    }
  }

  if (!updated.location) {
    const locationKeywords = ['qorin', 'ko\'krak', 'bosh', 'bel', 'bo\'g\'im', 'oyoq', 'qo\'l', 'bo\'yin'];
    if (locationKeywords.some(kw => lowerMessage.includes(kw))) {
      updated.location = message.match(new RegExp(locationKeywords.find(kw => lowerMessage.includes(kw)), 'i'))?.[0] || message;
    }
  }

  if (!updated.redFlag) {
    const redFlagKeywords = ['to\'satdan kuchli', 'ko\'krak og\'riq', 'nafas qisishi', 'hushdan ket', 'qon ket', 'yuqori isitma', 'chap qo\'lim', 'nutqim buzildi', 'nafasim siq'];
    if (redFlagKeywords.some(kw => lowerMessage.includes(kw))) {
      updated.redFlag = true;
    }
  }

  const phoneMatch = message.match(/(\+?998\d{9}|90\d{9}|\d{9})/);
  if (phoneMatch && !updated.phone) {
    let phone = phoneMatch[0].replace(/\s+/g, '');
    if (!phone.startsWith('+')) {
      if (phone.startsWith('998')) {
        phone = '+' + phone;
      } else if (phone.startsWith('90')) {
        phone = '+998' + phone;
      } else if (phone.length === 9) {
        phone = '+998' + phone;
      }
    }
    if (phone.startsWith('+998') && phone.replace(/[^0-9]/g, '').length >= 12) {
      updated.phone = phone;
    }
  }

  if (lowerReply.includes('terapevt') || lowerReply.includes('gastroenterolog')) {
    updated.suggestedDoctor = 'Terapevt / Gastroenterolog';
  } else if (lowerReply.includes('kardiolog')) {
    updated.suggestedDoctor = 'Kardiolog';
  } else if (lowerReply.includes('nevrolog') || lowerReply.includes('ortoped')) {
    updated.suggestedDoctor = 'Nevrolog / Ortoped';
  } else if (lowerReply.includes('ginekolog')) {
    updated.suggestedDoctor = 'Ginekolog';
  } else if (lowerReply.includes('pediatr')) {
    updated.suggestedDoctor = 'Pediatr';
  }

  if (updated.phone && updated.symptoms.length > 0) {
    updated.completed = true;
  }

  return updated;
}

export function getMissingFields(state) {
  const missing = [];
  if (!state.symptoms.length) missing.push('symptoms');
  if (!state.startedAt) missing.push('startedAt');
  if (!state.duration) missing.push('duration');
  if (!state.severity) missing.push('severity');
  if (!state.location) missing.push('location');
  if (!state.phone) missing.push('phone');
  return missing;
}

