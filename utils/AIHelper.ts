export async function askAI(prompt: string): Promise<string> {
    console.log("Calling model...");

    const response = await fetch(
        "http://localhost:11434/api/generate",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "llama3.2:1b",
                prompt: prompt,
                stream: false,
            }),
        }
    );

    console.log("Status:", response.status);

    const result = await response.json();

    console.log("Response received");

    return result.response;
}