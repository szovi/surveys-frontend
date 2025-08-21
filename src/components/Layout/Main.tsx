import type React from "react"
import '../../styles/main.scss'

interface MainProps {
    children: React.ReactNode
  }

const Main: React.FC<MainProps> = ({ children }) => {
    return (
      <main className="main">
        <div className="content-wrapper">
          {children}
        </div>
      </main>
    )
}

export default Main