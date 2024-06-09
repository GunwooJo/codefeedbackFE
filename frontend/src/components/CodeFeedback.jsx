import * as React from 'react';
import OpenAI from "openai";

const system_prompt = "당신은 사용자에게 입력받은 코드를 분석하는 AI입니다.\n당신은 입력받은 코드를 두 가지 방법으로 대답합니다.\n첫 번째, 코드를 보완해서 알려준다.\n두 번째, 코드를 자세히 설명한다."

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

export default async function CodeFeedback(prompt) {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: system_prompt },
        { "role": "user", "content": prompt }],
        model: "gpt-3.5-turbo"
    });
    return completion.choices[0].message.content;
};