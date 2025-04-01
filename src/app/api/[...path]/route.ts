import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    context: { params: { path: string[] } }
) {
    const imagePath = context.params.path.join('/');

    console.log('Attempting to fetch image:', imagePath);

    // Try first URL (uploads directory)
    let imageUrl = `http://localhost:8080/uploads/${imagePath}`;
    let imageData;
    let contentType;

    try {
        console.log('Trying first URL:', imageUrl);

        let response = await fetch(imageUrl);

        if (!response.ok) {
            console.log('First URL failed, trying second URL');
            imageUrl = `http://localhost:8000/images/${imagePath}`;
            response = await fetch(imageUrl);

            if (!response.ok) {
                console.log('Both URLs failed, returning 404');
                return new NextResponse('Image not found', { status: 404 });
            }
        }

        imageData = await response.arrayBuffer();
        contentType = response.headers.get('content-type') || 'image/jpeg';

        return new NextResponse(imageData, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
                'Access-Control-Allow-Origin': '*',
            }
        });

    } catch (error: any) {
        console.error('Error fetching image:', error.message);

        return NextResponse.json(
            {
                error: 'Error fetching image',
                message: error.message,
                url: imageUrl
            },
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
}
