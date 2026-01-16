export function createInitialState() {
  return {
    symptoms: [],
    startedAt: null,
    duration: null,
    severity: null,
    location: null,
    extraSymptoms: [],
    age: null,
    name: null,
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
    const timeMatch = message.match(/(\d+\s*(?:kundan|kun|haftadan|hafta|oydan|oy)\s*beri|\d+\s*(?:kun|hafta|oy)\s*davom|bugun|kecha|kechadan\s*beri|ertaga)/i);
    if (timeMatch) {
      updated.startedAt = timeMatch[0];
    }
  }

  if (!updated.duration) {
    const durationMatch = message.match(/(\d+\s*(?:kundan|kun|haftadan|hafta|oydan|oy)\s*beri|\d+\s*(?:kun|hafta|oy)\s*davom|kechadan\s*beri|bugun|kecha)/i);
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
    const locationKeywords = ['qorin', 'ko\'krak', 'bosh', 'bel', 'bo\'g\'im', 'oyoq', 'qo\'l', 'bo\'yin', 'quloq', 'qulog', 'burun', 'tomoq'];
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

  if (!updated.name) {
    // Birinchi: "ismim bonu" kabi formatlarni tekshirish
    const nameWithPrefix = message.match(/(?:ismim|mening ismim|menim ismim|mening ism|mening ismi)\s+(.+)/i);
    if (nameWithPrefix && nameWithPrefix[1]) {
      const potentialName = nameWithPrefix[1].trim();
      if (potentialName && 
          potentialName.length >= 2 && 
          potentialName.length <= 50 &&
          !/^\d+$/.test(potentialName) &&
          !potentialName.match(/\d{9,}/) &&
          !potentialName.match(/^(ha|yoq|yo'q|yes|no|да|нет)$/i)) {
        updated.name = potentialName.charAt(0).toUpperCase() + potentialName.slice(1).toLowerCase();
      }
    }
    
    // Ikkinchi: Agar ism pattern ishlamasa, faqat ismni tekshirish
    if (!updated.name) {
      const namePatterns = [
        /^([А-Яа-яА-ӯа-ӯA-Za-z]{2,}(?:\s+[А-Яа-яА-ӯа-ӯA-Za-z]{2,}){0,2})$/,
        /^([А-Яа-яА-ӯа-ӯA-Za-z]+)$/
      ];

      for (const pattern of namePatterns) {
        const match = message.match(pattern);
        if (match) {
          const potentialName = match[1]?.trim();
          if (potentialName && 
              potentialName.length >= 2 && 
              potentialName.length <= 50 &&
              !/^\d+$/.test(potentialName) &&
              !potentialName.match(/\d{9,}/) &&
              !potentialName.match(/^(ha|yoq|yo'q|yes|no|да|нет)$/i)) {
            updated.name = potentialName.charAt(0).toUpperCase() + potentialName.slice(1).toLowerCase();
            break;
          }
        }
      }
    }

    // Uchinchi: Agar AI "ismingizni" deb so'rasa va bemor javob bersa
    if (!updated.name && aiReply.toLowerCase().includes('ismingizni')) {
      const trimmedMessage = message.trim();
      // "ismim bonu" formatini qayta tekshirish
      const nameMatch = trimmedMessage.match(/(?:ismim|mening ismim|menim ismim|mening ism|mening ismi)\s+(.+)/i);
      if (nameMatch && nameMatch[1]) {
        const extractedName = nameMatch[1].trim();
        if (extractedName.length >= 2 && 
            extractedName.length <= 50 &&
            /^[А-Яа-яА-ӯа-ӯA-Za-z\s]+$/.test(extractedName) &&
            !extractedName.match(/\d/) &&
            !extractedName.match(/^(ha|yoq|yo'q|yes|no|да|нет)$/i)) {
          updated.name = extractedName.charAt(0).toUpperCase() + extractedName.slice(1).toLowerCase();
        }
      } else if (trimmedMessage.length >= 2 && 
          trimmedMessage.length <= 50 &&
          /^[А-Яа-яА-ӯа-ӯA-Za-z\s]+$/.test(trimmedMessage) &&
          !trimmedMessage.match(/\d/) &&
          !trimmedMessage.match(/^(ha|yoq|yo'q|yes|no|да|нет)$/i)) {
        updated.name = trimmedMessage.charAt(0).toUpperCase() + trimmedMessage.slice(1).toLowerCase();
      }
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

  // Shifokor yo'naltirish - bir nechta shifokor bo'lishi mumkin
  const doctors = [];
  
  if (lowerReply.includes('oftalmolog') || (lowerReply.includes('ko\'z') && lowerReply.includes('shifokor'))) {
    doctors.push('Oftalmolog');
  }
  if (lowerReply.includes('lor') || (lowerReply.includes('quloq') && lowerReply.includes('shifokor'))) {
    doctors.push('LOR');
  }
  if (lowerReply.includes('terapevt') || lowerReply.includes('gastroenterolog')) {
    if (!doctors.includes('Terapevt')) {
      doctors.push('Terapevt / Gastroenterolog');
    }
  }
  if (lowerReply.includes('kardiolog')) {
    doctors.push('Kardiolog');
  }
  if (lowerReply.includes('nevrolog') || lowerReply.includes('ortoped')) {
    doctors.push('Nevrolog / Ortoped');
  }
  if (lowerReply.includes('ginekolog')) {
    doctors.push('Ginekolog');
  }
  if (lowerReply.includes('pediatr')) {
    doctors.push('Pediatr');
  }
  
  // Agar bir nechta shifokor bo'lsa, ularni "va" bilan birlashtir
  if (doctors.length > 0 && !updated.suggestedDoctor) {
    updated.suggestedDoctor = doctors.join(' va ');
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

