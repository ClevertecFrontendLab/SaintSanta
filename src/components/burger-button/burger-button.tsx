import './burger-button.scss';

export type BurgerProps = {
  isOpenMenu: boolean;
  setOpenMenu: (state: boolean) => void;
};

export const ButtonMenuBurger = ({ isOpenMenu, setOpenMenu }: BurgerProps) => (
  <button
    className='buttonMenuBurger'
    type='button'
    onClick={() => {
      setOpenMenu(!isOpenMenu);
    }}
    data-test-id='button-burger'
  >
    <div className={isOpenMenu ? 'burger visible ' : 'burger'}>
      <span className='burger-lines' />
    </div>
  </button>
);
