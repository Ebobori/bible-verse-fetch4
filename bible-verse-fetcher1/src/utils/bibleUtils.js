// src/utils/bibleUtils.js

export const versionMap = {
    kjv: 'KJV',
    'king james version': 'KJV',
    niv: 'NIV',
    'new international version': 'NIV',
    nkjv: 'NKJV',
    'new king james version': 'NKJV',
    msg: 'MSG',
    'messenger': 'MSG',
    amp: 'AMP',
    'amplified version': 'AMP',
    'amplified bible': 'AMP',
    esv: 'ESV',
    'english standard version': 'ESV',
    cev: 'CEV',
    'common english version': 'CEV',
    nlt: 'NLT',
    'new living translation': 'NLT',
    tpt: 'TPT',
    'the passion translation': 'TPT',
    ylt: 'YLT',
    'young\'s literal translation': 'YLT',
    nrsv: 'NRSV',
    'new revised standard version': 'NRSV',
    nirv: 'NIRV',
    'new international reader\'s version': 'NIRV',
    ncv: 'NCV',
    'new century version': 'NCV',
    akjv: 'AKJV',
    'authorized king james version': 'AKJV',
    ampc: 'AMPC',
    'amplified classic': 'AMPC',
    gnb: 'GNB',
    'good news bible': 'GNB',
  };
  
  export const fullNames = {
    kjv: 'King James Version',
    niv: 'New International Version',
    nkjv: 'New King James Version',
    msg: 'The Message',
    amp: 'Amplified Bible',
    esv: 'English Standard Version',
    cev: 'Common English Version',
    nlt: 'New Living Translation',
    tpt: 'The Passion Translation',
    ylt: 'Young\'s Literal Translation',
    nrsv: 'New Revised Standard Version',
    nirv: 'New International Reader\'s Version',
    ncv: 'New Century Version',
    akjv: 'Authorized King James Version',
    ampc: 'Amplified Classic',
    gnb: 'Good News Bible',
  };
  
  export const localData = {
    KJV: '/data/kjv.json',
    NIV: '/data/niv.json',
    NKJV: '/data/nkjv2.json',
    MSG: '/data/msg.json',
    AMP: '/data/amp.json',
    ESV: '/data/esv.json',
    CEV: '/data/cev.json',
    NLT: '/data/nlt.json',
    TPT: '/data/tpt.json',
    YLT: '/data/ylt.json',
    NRSV: '/data/eng_nrsv.json',
    NIRV: '/data/nirv.json',
    NCV: '/data/ncv.json',
    AKJV: '/data/akjv.json',
    AMPC: '/data/ampc.json',
    GNB: '/data/gnb.json',
  };
  
  export const bookNameMap = {
    Genesis: 0,
    Exodus: 1,
    Leviticus: 2,
    Numbers: 3,
    Deuteronomy: 4,
    Joshua: 5,
    Judges: 6,
    Ruth: 7,
    '1 Samuel': 8,
    '2 Samuel': 9,
    '1 Kings': 10,
    '2 Kings': 11,
    '1 Chronicles': 12,
    '2 Chronicles': 13,
    Ezra: 14,
    Nehemiah: 15,
    Esther: 16,
    Job: 17,
    Psalms: 18,
    Proverbs: 19,
    Ecclesiastes: 20,
    'Song of Songs': 21,
    Isaiah: 22,
    Jeremiah: 23,
    Lamentations: 24,
    Ezekiel: 25,
    Daniel: 26,
    Hosea: 27,
    Joel: 28,
    Amos: 29,
    Obadiah: 30,
    Jonah: 31,
    Micah: 32,
    Nahum: 33,
    Habakkuk: 34,
    Zephaniah: 35,
    Haggai: 36,
    Zechariah: 37,
    Malachi: 38,
    Matthew: 39,
    Mark: 40,
    Luke: 41,
    John: 42,
    Acts: 43,
    Romans: 44,
    '1 Corinthians': 45,
    '2 Corinthians': 46,
    Galatians: 47,
    Ephesians: 48,
    Philippians: 49,
    Colossians: 50,
    '1 Thessalonians': 51,
    '2 Thessalonians': 52,
    '1 Timothy': 53,
    '2 Timothy': 54,
    Titus: 55,
    Philemon: 56,
    Hebrews: 57,
    James: 58,
    '1 Peter': 59,
    '2 Peter': 60,
    '1 John': 61,
    '2 John': 62,
    '3 John': 63,
    Jude: 64,
    Revelation: 65,
  };
  
  export const bookNameVariations = {
    Psalm: 'Psalms',
    Pslams: 'Psalms',
    Song: 'Song of Songs',
    SongOfSongs: 'Song of Songs',
    Songs: 'Song of Songs',
    '1Sam': '1 Samuel',
    '2Sam': '2 Samuel',
    '1Kgs': '1 Kings',
    '2Kgs': '2 Kings',
    '1Chr': '1 Chronicles',
    '2Chr': '2 Chronicles',
    Isa: 'Isaiah',
    Jer: 'Jeremiah',
    Lam: 'Lamentations',
    Eze: 'Ezekiel',
    Dan: 'Daniel',
    Hos: 'Hosea',
    Joe: 'Joel',
    Amo: 'Amos',
    Oba: 'Obadiah',
    Jon: 'Jonah',
    Mic: 'Micah',
    Nah: 'Nahum',
    Hab: 'Habakkuk',
    Zep: 'Zephaniah',
    Hag: 'Haggai',
    Zec: 'Zechariah',
    Mal: 'Malachi',
    Mat: 'Matthew',
    Mathew: 'Matthew',
    Matt: 'Matthew',
    Mar: 'Mark',
    Luk: 'Luke',
    Joh: 'John',
    Act: 'Acts',
    Rom: 'Romans',
    '1Cor': '1 Corinthians',
    '2Cor': '2 Corinthians',
    Gal: 'Galatians',
    Eph: 'Ephesians',
    Phi: 'Philippians',
    Col: 'Colossians',
    '1The': '1 Thessalonians',
    '2The': '2 Thessalonians',
    '1Tim': '1 Timothy',
    '2Tim': '2 Timothy',
    Tit: 'Titus',
    Phm: 'Philemon',
    Heb: 'Hebrews',
    Jam: 'James',
    '1Pet': '1 Peter',
    '2Pet': '2 Peter',
    '1Joh': '1 John',
    '2Joh': '2 John',
    '3Joh': '3 John',
    Jud: 'Jude',
    Rev: 'Revelation',
  };
  
  export const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };
  
  export const normalizeReference = (reference) => {
    return reference
      .replace(/[\s]+/g, ' ') // Normalize spaces
      .replace(/\b(v|vs|:)\b/gi, ':') // Normalize separators
      .replace(/(\d)([a-zA-Z])/g, '$1 $2') // Add space between digit and letter
      .replace(/([a-zA-Z])(\d)/g, '$1 $2') // Add space between letter and digit
      .replace(/\s*:\s*/g, ':') // Remove spaces around :
      .trim();
  };
  
  export const parseInput = (input) => {
    console.log("Original Input:", input); // Log original input for debugging
    input = normalizeReference(input);
    console.log("Normalized Input:", input); // Log normalized input for debugging
    const parts = input.match(/^([1-4]?[a-zA-Z\s]+)\s+(\d+:\d+(?:-\d+)?(?:\s*(?:to|and|-)\s*\d+)*)(.*)$/i);
    if (parts) {
      parts[1] = capitalizeWords(parts[1]);
      console.log("Parsed Parts:", parts); // Log parsed parts for debugging
    } else {
      console.log("Failed to match parts:", input); // Log if regex fails to match
    }
    return parts ? [parts[1].trim(), parts[2].trim(), parts[3] ? parts[3].trim() : ''] : [null, null, null];
  };
  
  export const getVersesFromJson = (data, book, chapterAndVerse, version, bookNameMap) => {
    const [chapter, versesRange] = chapterAndVerse.split(':');
    const [startVerse, endVerse] = versesRange.includes('-') ? versesRange.split('-').map(Number) : [Number(versesRange), Number(versesRange)];
  
    const bookIndex = bookNameMap[book];
    if (bookIndex === undefined) {
      return null;
    }
  
    if (data.bible) {
      // Old schema
      const bookData = data.bible.b[bookIndex];
      if (!bookData) {
        return null;
      }
  
      const chapterData = bookData.c[parseInt(chapter) - 1];
      if (!chapterData) {
        return null;
      }
  
      const verses = chapterData.v.slice(startVerse - 1, endVerse);
      return verses.map((text, index) => ({
        chapter: parseInt(chapter),
        verse: startVerse + index,
        text,
        book,
        version,
        isFirstVerse: index === 0
      }));
    } else if (data.XMLBIBLE) {
      // New schema
      const bookData = data.XMLBIBLE.BIBLEBOOK[bookIndex];
      if (!bookData) {
        return null;
      }
  
      const chapterData = bookData.CHAPTER[parseInt(chapter) - 1];
      if (!chapterData) {
        return null;
      }
  
      const verses = chapterData.VERS.slice(startVerse - 1, endVerse);
      return verses.map((text, index) => ({
        chapter: parseInt(chapter),
        verse: startVerse + index,
        text,
        book,
        version,
        isFirstVerse: index === 0
      }));
    } else {
      return null;
    }
  };
  
  export const splitText = (text, maxLength) => {
    const result = [];
    let start = 0;
    while (start < text.length) {
      let end = start + maxLength;
      if (end < text.length && text[end] !== ' ' && text[end - 1] !== ' ') {
        end = text.lastIndexOf(' ', end);
      }
      result.push(text.substring(start, end).trim());
      start = end + 1;
    }
    return result;
  };
  