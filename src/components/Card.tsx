import type { PropsWithChildren, ReactNode } from 'react'

export function Card({
  title,
  children,
  right,
}: PropsWithChildren<{ title: string; right?: ReactNode }>) {
  return (
    <section className="card">
      <header className="cardHeader">
        <h2 className="cardTitle">{title}</h2>
        {right ? <div className="cardRight">{right}</div> : null}
      </header>
      <div className="cardBody">{children}</div>
    </section>
  )
}

