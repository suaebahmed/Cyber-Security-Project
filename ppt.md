 # Cryptography Algorithms Explorer

 ## Slide 1: Project Overview

 - **Project:** Cryptography Algorithms Explorer
 - **Course:** Cyber Security, CSE-323
 - An interactive web application for learning how encryption and decryption algorithms work.
 - Users can select an algorithm, enter text and keys, and observe the transformation from input to result.
 - The main goal is to make cryptography concepts visual, practical, and easier to understand.

 ## Slide 2: Project Objectives

 - Demonstrate the difference between substitution, transposition, and asymmetric cryptography.
 - Allow users to test both encryption and decryption modes.
 - Show intermediate calculations instead of displaying only the final answer.
 - Explain how keys influence the encrypted output.
 - Provide a single, organized interface for comparing several classical algorithms with RSA.

 ## Slide 3: Algorithms Included

 - **Monoalphabetic ciphers:** Additive, Multiplicative, and Affine.
 - **Polyalphabetic ciphers:** Autokey, Playfair, and Vigenere.
 - **Transposition cipher:** Rail Fence.
 - **Asymmetric cryptography:** RSA Cryptosystem.
 - The collection demonstrates fixed substitutions, changing substitutions, rearrangement of letters, pair-based encryption, and public-key encryption.

 ## Slide 4: How the Application Works

 1. The user chooses an algorithm from the cipher index.
 2. The user selects encryption or decryption mode.
 3. Plaintext or ciphertext and the required key are entered.
 4. The application validates and normalizes the input.
 5. The algorithm processes the data and displays the result.
 6. Relevant steps, key patterns, character transformations, or diagrams explain the calculation.

 **Example:** In the Vigenere demo, the keyword is normalized and repeated across the message. Each character is then shifted using modular arithmetic.

 ## Slide 5: RSA Visualization

 - RSA demonstrates asymmetric encryption using a public key and a private key.
 - The public key contains $(e, n)$ and is used for encryption.
 - The private key contains $(d, n)$ and is used for decryption.
 - Encryption follows: $C = M^e \bmod n$.
 - Decryption follows: $M = C^d \bmod n$.
 - The project includes separate visual representations for encryption and decryption, helping users follow the role of each key.

 ## Slide 6: Technology and Conclusion

 - **Frontend:** React 19 with Next.js 15.
 - **Styling:** Tailwind CSS with responsive layouts and light/dark theme support.
 - **Interface:** Reusable input, key, button, mode-toggle, and visualization components.
 - **Learning value:** Users can experiment with inputs and compare how different algorithms protect information.
 - **Conclusion:** The project connects cryptographic theory with an accessible, interactive demonstration platform.

 **Future improvements:** Add user-defined RSA key generation, stronger input validation, saved examples, and more visual explanations for every cipher.
