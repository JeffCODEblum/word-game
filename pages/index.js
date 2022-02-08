import Head from 'next/head'
import styles from '../styles/Home.module.css'
import MainComponent from './mainComponent.js';

export default function Home() {
  return (
    <div className={styles.container}>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <Head>
        <title>Word Game</title>
        <meta name="description" content="Word Game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <main>
          <MainComponent />
        </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
