type StatusPageProps = {
  title: string
}

/**
 * The plain status page used for 404 and fatal errors. It renders outside the
 * site layout and brings its own styles, so it cannot be broken by a failure
 * elsewhere in the app.
 */
const StatusPage = ({ title }: StatusPageProps) => (
  <main className="okwe-status">
    <style
      dangerouslySetInnerHTML={{
        __html: `
          html, body { margin: 0; }
          html * { box-sizing: border-box; }
          .okwe-status {
            display: flex;
            align-items: center;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
            text-align: center;
            background-color: #E2E8F0;
            height: 100vh;
          }
          .okwe-status section {
            background-color: white;
            border-radius: 0.25rem;
            width: 32rem;
            padding: 1rem;
            margin: 0 auto;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          }
          .okwe-status h1 {
            font-size: 2rem;
            margin: 0;
            font-weight: 500;
            line-height: 1;
            color: #2D3748;
          }
        `,
      }}
    />
    <section>
      <h1>
        <span>{title}</span>
      </h1>
    </section>
  </main>
)

export default StatusPage
