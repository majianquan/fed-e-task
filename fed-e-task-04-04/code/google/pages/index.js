import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/index.module.css'

export default function Home() {
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [link, setLink] = useState('')
  const [tiles, setTiles] = useState([
    {
      title: '百度一下，你就知道',
      link: 'https://www.baidu.com',
    },
  ])

  const handleSubmit = () => {
    setTiles([
      ...tiles,
      {
        title,
        link,
      },
    ])
    setVisible(false)
    setTitle('')
    setLink('')
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Google</title>
        <link rel="icon" href="/images/index/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <img className={styles.google} src="/images/index/google.png" alt="google" />
        <div className={styles.inputWrapper}>
          <input type="text" placeholder="在 Google 上搜索，或者输入一个网址" />
          <span className={styles.icon}></span>
          <button
            className={styles.voiceSearchButton}
            title="语音搜索"
          ></button>
        </div>
        <div className={styles.quick}>
          {tiles.map((tile, index) => (
            <a
              key={index}
              className={styles.tile}
              title={tile.title}
              href={tile.link}
            >
              <div className={styles.tileIcon}>
                <img draggable="false" src={`${tile.link}/favicon.ico`} />
              </div>
              <div className={styles.tileTitle}>
                <span>{tile.title}</span>
              </div>
            </a>
          ))}
          {tiles.length < 10 && (
            <button
              className={styles.addShortcut}
              onClick={() => setVisible(true)}
            >
              <div className={styles.tileIcon}>
                <div className={styles.addShortcutIcon} draggable="false"></div>
              </div>
              <div className={styles.tileTitle}>
                <span>添加快捷方式</span>
              </div>
            </button>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by jianquanma
        </a>
      </footer>
    </div>
  )
}
