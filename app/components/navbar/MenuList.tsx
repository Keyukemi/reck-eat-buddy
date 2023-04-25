'use client';

interface MenuListProps {
    onClick: () => void;
    label: string;
}

const MenuList: React.FC<MenuListProps> = ({
    onClick, 
    label
}) => { 
    return ( 
        <div onClick={onClick}
        className="px-4 py-3 transition font-semibold hover:bg-neutral-100">
            {label}
        </div>
     );
}
 
export default MenuList;