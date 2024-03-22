import { ChatInput } from './components/ChatInput'
import { ChatWindow } from './components/ChatWindow'
import { Headder } from './components/Headder'
import { SideBar } from './components/SideBar'
const App = () => {
  return (
    <div className=' w-screen h-screen overflow-hidden'>

      <Headder />


      <div className='grid grid-cols-12 h-full'>

        <div className='md:block hidden md:col-span-3 lg:col-span-2 bg-slate-400 '>

          <SideBar />


        </div>

        <div className='col-span-12 md:col-span-9 lg:col-span-10'>

          <div className=' h-[950px] m-3 p-3 md:w-[70%]  lg:w-[60%] mx-auto overflow-auto'>

            <ChatWindow />
          </div>


          <div className='bg-slate-200 h-[100px] '>
            {/* input */}
            <ChatInput />
          </div>
        </div>

      </div>
    </div>
  )
}

export default App
