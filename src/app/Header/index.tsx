import AppLogo from '../AppLogo/index'
import { useEffect } from "react"

import {
  Search,
  PersonOutline,
  ShoppingCart,
} from '@mui/icons-material'

const Header = () =>  {
  // useEffect for logging render
  useEffect(() => {
    console.log(`Header component fresh render`);

    // Load OneSignal SDK asynchronously
    const script = document.createElement('script');
    script.src = "https://cdn.onesignal.com/sdks/OneSignalSDK.js";
    script.async = true;
    document.head.appendChild(script);

    // Initialize OneSignal once the script is loaded
    script.onload = () => {
      window.OneSignalDeferred = window.OneSignalDeferred || [];
  
      // Check if process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID is defined before using it
      if (typeof process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID !== 'undefined') {
        window.OneSignalDeferred.push(function(OneSignal) {
          OneSignal.init({
            appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID as string,
          });
        });
      } else {
        console.error("OneSignal App ID is not defined.");
      }
    };

    // Cleanup function
    return () => {
      document.head.removeChild(script);
    };
  }, []); // Runs once on component mount

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
          <span className='inline-block mb-4 pr-4'>{/**<NavLink>  インラインブロック要素横並び*/}
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

export default Header;
