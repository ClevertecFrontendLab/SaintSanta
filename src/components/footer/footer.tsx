import { FC } from 'react';

import facebook from '../../assets/icon/facebook.png'
import instagram from '../../assets/icon/instagram.png'
import linkedin from '../../assets/icon/linkedin.png'
import vk from '../../assets/icon/vk.png'

import './footer.scss'

export const Footer: FC = () => (
    <footer className='footer'>
        <span className='footer-text'>© 2020-2023 Cleverland. Все права защищены.</span>
        <div className="social">
            <img src={facebook} alt="facebook" />
            <img src={instagram} alt="instagram" />
            <img src={vk} alt="vk" />
            <img src={linkedin} alt="linkedin" />
        </div>
    </footer>
)
