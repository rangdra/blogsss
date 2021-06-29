import Head from 'next/head';
import Header from './Header';
import Search from './Search';

const Layout = ({ children, title, keywords, description }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Search />
      <main className="container mx-auto my-7">{children}</main>
    </div>
  );
};

export default Layout;

Layout.defaultProps = {
  title: 'Welcome To Blogsss',
  keywords: 'development, web, app, coding, programming',
  description: 'Kumpulan blog tentang programming',
};
