import AppLogo from '../AppLogo/index'
import { useEffect } from "react"

import {
  Search,
  PersonOutline,
  ShoppingCart,
} from '@mui/icons-material'

const Header = () =>  {

  //レンダ確認
  useEffect(() => {
    console.log(`Header compo fresh render`);
  }); //依存配列なしの場合 render毎実行

  return (
    <header>
      <div className='flex justify-between px-2 mt-4'>
      
        <nav className='flex ml-1 h-14 items-center'>{/** ナビゲート & > span:not(:first-child) */}
          <span className='inline-block mb-4 pr-4'>{/**<NavLink>  インラインブロック要素横並び*/}
              <div className='animate-bounce cursor-pointer hover:transform hover:duration-1000 hover:scale-y-125 hover:ease-in-out'><AppLogo /></div>
          </span>
          <span className='inline-block mb-4 pr-4'>
              <div className='cursor-pointer hover:underline'>とっぷ(todo)</div>
          </span>
          <span className='inline-block mb-4 pr-4'>
            <div className='block'>
                <div className='cursor-pointer hover:underline'>おしらせ(todo)</div>
            </div>
          </span>
          <span className='inline-block mb-4 pr-4'>
              <div className='cursor-pointer hover:underline'>しつもん(todo)</div>
          </span>
        </nav>

        <nav className='flex ml-1 h-14 items-center'>{/** ナビゲート & > span:not(:first-child) */}
          <span className='inline-block mb-4 pr-4'>
              <div className='cursor-pointer hover:transform hover:duration-1000 hover:scale-y-125 hover:ease-in-out'>
                <Search style={{ fontSize: 24, color: 'primary' }} />
              </div>
          </span>
          <span className='inline-block mb-4 pr-4'>
              <div className='cursor-pointer hover:transform hover:duration-1000 hover:scale-y-125 hover:ease-in-out'>
                <ShoppingCart style={{ fontSize: 24, color: 'primary' }} />
              </div>
          </span>
          <span className='inline-block mb-4 pr-4'>
              <div className='animate-bounce cursor-pointer hover:transform hover:duration-1000 hover:scale-y-125 hover:ease-in-out'>
                <PersonOutline style={{ fontSize: 24, color: 'primary' }} />
              </div>
          </span>
        </nav>
      </div>
    </header>    
  )
}

export default Header
