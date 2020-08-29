sourceCode = `
  def main(private field firstNumber, private field secondNumber, field sum) -> (field):
    field result = if firstNumber + secondNumber == sum then 1 else 0 fi
    return result
`;

module.exports = { sourceCode };
