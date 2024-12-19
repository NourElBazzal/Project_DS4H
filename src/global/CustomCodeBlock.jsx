import { CodeBlock } from 'react-code-block';
import {themes} from "prism-react-renderer";

const CustomCodeBlock = ({ code, language }) => {
    console.log(code)
  return (
    <CodeBlock code={code} language={language} theme={themes.gruvboxMaterialLight}>
      <CodeBlock.Code>
        <CodeBlock.LineContent>
          <CodeBlock.Token />
        </CodeBlock.LineContent>
      </CodeBlock.Code>
    </CodeBlock>
  );
}

export default CustomCodeBlock
