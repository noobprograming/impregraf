import { StrapiDataService } from "@/app/api/strapi";
import { NextResponse } from "next/server";

export async function GET() {
    const categories = await new StrapiDataService().getCategories();
    return NextResponse.json({
        categories: categories
    });
}
