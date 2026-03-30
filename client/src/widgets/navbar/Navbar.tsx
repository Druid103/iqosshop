import { Menu, MenuItem } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { Link } from 'react-router-dom';
type MenuProps = {
  activeItem: string;
  handleItemClick: (name: string) => void;
};
export default function NavBar({ handleItemClick, activeItem }: MenuProps): React.JSX.Element {
  return (
    <Menu pointing inverted>
      <MenuItem
        as={Link}
        to="/books"
        name="Книги"
        active={activeItem === 'Книги'}
        onClick={() => handleItemClick('Книги')}
      />
      <MenuItem
        as={Link}
        to="/add"
        name="Добавить книгу"
        active={activeItem === 'Добавить книгу'}
        onClick={() => handleItemClick('Добавить книгу')}
      />
      <MenuItem
        as={Link}
        to="/mybooks"
        name="Мои книги"
        active={activeItem === 'Мои книги'}
        onClick={() => handleItemClick('Мои книги')}
      />
    </Menu>
  );
}
