function About() {
  return (
    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-4 sm:mt-6 p-4 sm:p-5 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300">
      <h3 className="font-semibold text-gray-700 dark:text-gray-100 mb-2 text-sm sm:text-base">
        About the Cipher
      </h3>
      <p className="mb-2 leading-relaxed">
        The Vigenère cipher is a polyalphabetic substitution cipher that uses a
        keyword to determine shifting values, making it more secure than simple
        monoalphabetic ciphers like the Caesar cipher.
      </p>
      <p className="mb-2 leading-relaxed">
        Each letter of the keyword specifies a different shift amount for each
        corresponding letter in the plaintext.
      </p>
      <p className="leading-relaxed">
        <span className="font-semibold text-gray-700 dark:text-gray-100">
          Formula:
        </span>{" "}
        Encryption = (plaintext position + key position) mod 26,&nbsp;
        Decryption = (ciphertext position - key position + 26) mod 26
      </p>
    </div>
  );
}

export default About;
