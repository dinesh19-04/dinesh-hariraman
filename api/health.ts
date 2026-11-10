export default function handler(_req: any, res: any) {
  return res.status(200).json({
    status: 'online',
    app: 'DINESH H Portfolio API',
    timestamp: new Date().toISOString(),
  });
}
