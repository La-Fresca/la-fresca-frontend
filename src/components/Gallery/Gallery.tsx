import React from 'react'
import ImagesSet from './Images-set'
import { TitleBox } from '../Landing/TitleBox'
import {Button} from "@nextui-org/react";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";

export const Gallery = () => {
  return (
    <div className='bg-transparent'>
        {/* <h1 className='text-xl'>Gallery</h1> */}
        <TitleBox title='gallery' subtitle='la Fresca cafe' button='' ClassName='relative top-0 lect-0 w-screen h-fit px-20 mb-10 bg-white ' URLLink='' />
        {/* <Button color="primary" variant="bordered">
        Bordered
      </Button>   */}
      <div className="flex w-full flex-col">
      <Tabs 
      aria-label="Options"
      variant="underlined"
      color={'warning'}
      radius="full"
      >
        <Tab key="all" title="All">
          <Card>
            <CardBody>
              {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. */}
              <ImagesSet type={'all'} />
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="interior" title="Interior">
          <Card>
            <CardBody>
              {/* Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. */}
              <ImagesSet type={'interior'} />
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="exterior" title="Exterior">
          <Card>
            <CardBody>
              {/* Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. */}
              <ImagesSet type={'exterior'} />
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="food" title="Food">
          <Card>
            <CardBody>
              {/* Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. */}
              <ImagesSet type={'food'} />
            </CardBody>
          </Card>  
        </Tab>
      </Tabs>
      
    </div>  
        {/* <ImagesSet/> */}
    </div>
  )
}
