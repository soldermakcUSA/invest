export async function createHeleketInvoice(payload: Record<string, unknown>) {
  return {
    provider: "heleket",
    status: "stubbed",
    payload
  };
}
