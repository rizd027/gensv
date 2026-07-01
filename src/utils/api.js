export const getApiConfig = (customModel = null) => {
  const selectedModel = customModel || 'llama-3.3-70b-versatile';
  const isOpenRouter = selectedModel.includes('/') || selectedModel.includes(':');
  
  if (isOpenRouter) {
    const savedKey = localStorage.getItem('openrouter_api_key') || 
                     (localStorage.getItem('groq_api_key')?.startsWith('sk-or-') ? localStorage.getItem('groq_api_key') : '') || '';
    const defaultOrKey = '';
    const key = savedKey ? savedKey : defaultOrKey;
    return {
      url: 'https://openrouter.ai/api/v1/chat/completions',
      key,
      model: selectedModel,
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://gensv.local',
        'X-Title': 'GenSV'
      }
    };
  } else {
    const savedKey = localStorage.getItem('groq_api_key') || '';
    const defaultGroqKey = '';
    const key = savedKey && !savedKey.startsWith('sk-or-') ? savedKey : defaultGroqKey;
    return {
      url: '/api-groq/openai/v1/chat/completions',
      key,
      model: selectedModel,
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      }
    };
  }
};
