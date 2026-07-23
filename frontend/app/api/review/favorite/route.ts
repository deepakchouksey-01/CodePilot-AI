import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest) {
  try {
    const { id } = await req.json();

    const review = await prisma.review.findUnique({
      where: {
        id,
      },
    });

    if (!review) {
      return NextResponse.json(
        {
          error: "Review not found",
        },
        {
          status: 404,
        }
      );
    }

    const updated = await prisma.review.update({
      where: {
        id,
      },
      data: {
        isFavorite: !review. isFavorite,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}