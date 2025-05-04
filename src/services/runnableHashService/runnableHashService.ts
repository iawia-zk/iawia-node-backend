export function executeRunnableHash(base64Code: string, input: any): Promise<boolean> {
  try {
    const decodedCode = Buffer.from(base64Code, 'base64').toString('utf-8');

    const verify = eval(`(${decodedCode})`);
    const result = verify(input);
    return result;
  } catch (error) {
    console.error('Error executing code:', error);
    throw new Error('Failed to execute code');
  }
}
