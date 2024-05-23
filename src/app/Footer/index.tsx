import { useEffect } from "react"

const Footer = () => {
  
  //レンダ確認
  useEffect(() => {
    console.log(`footer compo fresh render`);
  }); //依存配列なしの場合 render毎実行

  return (
    <footer>
      <div className='flex flex-col md:flex-row'>        
        <div className='mb-4 min-w-full'>     
          <nav className='flex flex-col md:flex-row'>
            <div className='mb-2 pr-3'>
                <div className='cursor-pointer hover:underline'>トップ(todo)</div>
            </div>
            <div className='mb-2 pr-3'>
                <div className='cursor-pointer hover:underline'>お知らせ(todo)</div>
            </div>
            <div className='mb-2 pr-3'>
                <div className='cursor-pointer hover:underline'>利用規約(todo)</div>
            </div>
            <div className='mb-2 pr-3'>
                <div className='cursor-pointer hover:underline'>プライバシーポリシー(todo)</div>
            </div>
            <div className='flex mb-2 pr-3'>
                <div className='cursor-pointer hover:underline'>お問い合わせ(todo)</div>
            </div>   
          </nav>
          <div className='py-3'>
            <>© 2024 何もわからん Co., Ltd..</>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer