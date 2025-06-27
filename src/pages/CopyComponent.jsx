import React, { useState, useRef } from 'react';

function CopyComponent() {
  // Default SSH key to display immediately for copying
  const defaultKey = `ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDWBRPSQ+nrnSiXSGN8OcIquNVKW+BHmLUZqr4b8Sb/OT9XorSi33kMH4h+2WJRImAn092SR/PasynwM97mODvmM3fuh1W6TeyuyrAZlaDvAtxZRjTeUIQcAO7wTlfxiyjpb9tnqeqN3RkL/eRDka9H8jDm4BApmjK6IXZu2ciml/N0wMolbJEEcDDBz9qrdpqL73Gznfmw8m5R2BMagc3bx4iW+VfocNuty0hVHlwqtmXfWt+4+1ovqr5IfEYMgp3QxEcmT+Is11IGPBX5qkheAfHhJFSiQbS87MAtivTpft5Ufk0q30V7KJjo3uPlKBtL5edksfN/4pcv+Pg7TLHc/t9E7tRwajgwtwYMoiVRBsDPLdpXQC7MB70Viz+r4odrdWzsW5F5nERw7R/bsFfjOH+d31ZZQf3eAaTFsrwBWj1MA0cght/BFYHcbrSHwMmz6Gx8SDwRhdB/BGC4+wZT8rGNxPCqJKgrcQisocxLrSjALQ3UCzu5Otr8lsiMB1k= santiagoquintero@Santiagos-MacBook-Pro.local`;

  const [text, setText] = useState(defaultKey);
  const textRef = useRef(null);

  const handleCopy = async () => {
    if (navigator.clipboard && text) {
      try {
        await navigator.clipboard.writeText(text);
        alert('SSH key copied to clipboard!');
      } catch (err) {
        console.error('Copy failed', err);
      }
    } else if (textRef.current) {
      textRef.current.select();
      document.execCommand('copy');
      alert('SSH key copied to clipboard!');
    }
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-2">Scratch Pad</h2>
      <textarea
        ref={textRef}
        className="w-full h-64 p-2 border rounded focus:outline-none focus:ring"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex space-x-2 mt-3">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleCopy}
        >
          Copy All
        </button>
        <button
          className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default CopyComponent;
