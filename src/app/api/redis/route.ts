import { createClient } from 'redis';
import { NextResponse } from 'next/server';

const redis = await createClient().connect();

export const POST = async () => {
  // Fetch data from Redis
  const result = await redis.get("item");

  // Return the result in the response
  return new NextResponse(JSON.stringify({ result }), { status: 200 });
};

export const GET = async () => {
  // Logique pour récupérer les données avec GET
  const result = await redis.get("query:5f623ff50d97c52c736847ad8bdd1c52552ba83944077edf05a481fc8edd577b"); // Ou une autre logique GET
  return new NextResponse(JSON.stringify({ result }), { status: 200 });
}; 