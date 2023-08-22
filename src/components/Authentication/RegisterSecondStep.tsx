import Image from 'next/image'
import { Heading } from '../ui/Heading'
import React, { useCallback, useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { useDropzone } from 'react-dropzone'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { User } from '@/Types/User'
import { useToast } from '../ui/use-toast'
import { ToastAction } from '../ui/toast'

interface props {
  onFinishStep: (userInfo: Partial<User>) => void
}

export const RegisterSecondStep = (props: props) => {
  const { toast } = useToast()
  const [file, setFile] = useState<File>();
  const onDrop = useCallback((files: File[]) => {
    let isValid = true;
    if (!files[0].type.endsWith("jpg") && !files[0].type.endsWith("png") && !files[0].type.endsWith("jpeg")) {
      isValid = false;
    }
    isValid && setFile(files[0])
  }, [setFile])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const finishStep = useCallback(() => {
    if (!file) {
      return toast({ title: "Please Insert an image", description: "That is literally the easiest thing ever, please!", action: <ToastAction altText="LOL">Ok!</ToastAction> })
    }
    props.onFinishStep.bind(this, { avatar: file })
  }, [file, props.onFinishStep])
  return (
    <div>
      <h1 className='text-center font-bold text-xl mb-4 '>Insert an avatar</h1>
      <div {...getRootProps()} className='w-[70%] mx-auto relative aspect-square rounded-full border-4 border-dashed overflow-hidden bg-red-300 hover:bg-red-400 cursor-pointer transition'>
        {file ?
          <Image
            src={`${URL.createObjectURL(file)}`}
            alt=""
            width={1000}
            height={1000}
          />
          :
          <AiOutlineUser className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full" />
        }
        <Input className='w-full aspect-square ' name="file0" {...getInputProps()} />
      </div>
      <div className='grid grid-cols-2 mt-5 gap-2'>
        <Button variant={"ghost"}>Skip</Button>
        <Button onClick={finishStep} variant={"default"}>Ok</Button>
      </div>
    </div>
  )
}
