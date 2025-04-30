export default function EventDescription() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-6">About This Event</h2>
      <div className="prose prose-lg max-w-none">
        <p>
          Join us for an immersive workshop on Software Development Engineering best practices, tips, and tricks that
          will accelerate your career in tech. This event is designed for students and early-career professionals who
          want to gain practical insights into the world of software development.
        </p>
        <p>
          Our expert speakers from leading tech companies will share their experiences, challenges, and solutions
          they've encountered throughout their careers. You'll learn about modern development workflows, tools that
          boost productivity, and strategies to write cleaner, more maintainable code.
        </p>
        <h3 className="text-xl font-semibold mt-6 mb-3">What You'll Learn:</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Effective debugging techniques that save hours of frustration</li>
          <li>Code review best practices that improve team collaboration</li>
          <li>Performance optimization strategies for web and mobile applications</li>
          <li>DevOps principles that streamline your deployment pipeline</li>
          <li>Career advancement tips from industry veterans</li>
        </ul>
      </div>
    </section>
  )
}
