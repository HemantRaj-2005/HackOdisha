import Typewriter from "typewriter-effect";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#f39c12] via-[#e67e22] to-[#e74c3c]">
        <Typewriter
          options={{
            strings: ["This is Authentication app"],
            autoStart: true,
            loop: true,
            cursor: "_", // Blinking cursor
            delay: 75, // Speed of typing
            deleteSpeed: 50, // Speed of deletion (if used)
          }}
        />
      </h1>
    </div>
  );
}
