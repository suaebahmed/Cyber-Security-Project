export function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
  
    let i = 5;
    while (i * i <= num) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
      i += 6;
    }
    return true;
  }
  
  export function gcd(a, b) {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }
  
  export function validateKeys(e, d, phi, setKeyValidation) {
    const eGcd = gcd(e, phi);
    const product = (e * d) % phi;
  
    if (eGcd !== 1) {
      setKeyValidation({
        valid: false,
        message: `Invalid public key: gcd(e, φ(n)) = ${eGcd}, must be 1.`,
      });
    } else if (product !== 1) {
      setKeyValidation({
        valid: false,
        message: `Invalid key pair: (e × d) mod φ(n) = ${product}, must be 1.`,
      });
    } else {
      setKeyValidation({
        valid: true,
        message: "Key pair is valid.",
      });
    }
  }
  
  export function modPow(base, exponent, modulus) {
    if (modulus === 1) return 0;
  
    let result = 1;
    base = base % modulus;
  
    const steps = [];
    let iteration = 0;
  
    while (exponent > 0) {
      iteration++;
      const currentBase = base;
      const currentExponent = exponent;
      const currentResult = result;
  
      if (exponent % 2 === 1) {
        result = (result * base) % modulus;
        steps.push({
          iteration,
          operation: "exponent is odd",
          calculation: `result = (${currentResult} * ${currentBase}) % ${modulus} = ${result}`,
        });
      } else {
        steps.push({
          iteration,
          operation: "exponent is even",
          calculation: `result remains ${result}`,
        });
      }
  
      exponent = Math.floor(exponent / 2);
      base = (base * base) % modulus;
  
      steps.push({
        iteration,
        operation: "squaring base",
        calculation: `base = (${currentBase} * ${currentBase}) % ${modulus} = ${base}`,
      });
  
      steps.push({
        iteration,
        operation: "halving exponent",
        calculation: `exponent = ${currentExponent} / 2 = ${exponent}`,
      });
    }
  
    return result;
  }