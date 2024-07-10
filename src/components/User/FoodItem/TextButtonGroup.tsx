import { Button, ButtonGroup } from "@nextui-org/react";

interface Props {
    name: string;
    levels: string[];
}

export default function TextButtonGroup({ name, levels }: Props) {
  return (
    <div className='flex mt-8'>
      <div className='text-white mt-2'>
        <b>{name}:</b>
      </div>
      <ButtonGroup className='ml-5'>
        {levels.map((level, index) => {
          let buttonClass = 'border duration-300 hover:text-white';

          if (index === 0) {
            buttonClass += ' rounded-l-lg';
          } else if (index === levels.length - 1) {
            buttonClass += ' rounded-r-lg';
          }

          return (
            <Button key={index} className={buttonClass}>
              {level}
            </Button>
          );
        })}
      </ButtonGroup>
    </div>
  );
}
