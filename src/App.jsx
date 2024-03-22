import { ChatInput } from './components/ChatInput'
import { ChatWindow } from './components/ChatWindow'
import { Headder } from './components/Headder'
import { SideBar } from './components/SideBar'
const App = () => {
  return (
    <div className=' w-screen h-screen overflow-x-hidden'>

      <Headder />

      <div className='grid grid-cols-12 z-40'>

        <div className='md:block hidden md:col-span-3 lg:col-span-2 bg-slate-400 '>

          <SideBar />


        </div>

        <div className='col-span-12 md:col-span-9 lg:col-span-10'>

          <div className='h-[950px] m-3 sm:mb-16 sm:pb-8 md:w-[70%]  lg:w-[60%] mx-auto overflow-auto hide-scrollbar -z-50'>

            <ChatWindow />
          </div>

          <div className='p-2 w-full bottom-0 fixed bg-white'>
            {/* input */}
            <ChatInput />
          </div>

        </div>

      </div>

    </div>
  )
}

export default App
