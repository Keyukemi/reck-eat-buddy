'use client'

interface InstructionBoxProps{
    instructions?: string
}

const InstructionBox: React.FC <InstructionBoxProps>  = ({
    instructions
}) => {
    return (  
        <div>
            Write instructions here
            {instructions}
        </div>
    );
}
 
export default InstructionBox;