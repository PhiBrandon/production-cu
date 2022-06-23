import Document, { DocumentContext, DocumentInitialProps, Html, Main, Head, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
        <Html className='h-full bg-gray-50'>
            <Head />
            <body className='h-full'>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
  }
}

export default MyDocument