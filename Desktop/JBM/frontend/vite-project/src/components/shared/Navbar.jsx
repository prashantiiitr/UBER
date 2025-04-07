import React from 'react';
import { Link } from 'react-router-dom'; 
import { Button } from '../ui/button'; 
import { Avatar, AvatarImage } from '../ui/avatar'; 
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'; 

const Navbar = () => {
  return (
    <div className='bg-white'>
      <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
        <div>
          <h1 className='text-2xl font-bold'>
            Job<span className='text-[#F83002]'>Portal</span>
          </h1>
        </div>
        <div className='flex items-center gap-12'>
          <ul className='flex font-medium items-center gap-5'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
            <li><Link to="/browse">Browse</Link></li>
          </ul>

          {/* Login and Signup buttons */}
          <div className='flex items-center gap-2'>
            <Link to="/login"><Button variant="outline">Login</Button></Link>
            <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
          </div>

          {/* User Avatar with popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://via.placeholder.com/150" alt="user-avatar" />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className=''>
                <div className='flex gap-2 space-y-2'>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://via.placeholder.com/150" alt="user-avatar" />
                  </Avatar>
                  <div>
                    <h4 className='font-medium'>Full Name</h4>
                    <p className='text-sm text-muted-foreground'>Short bio here</p>
                  </div>
                </div>
                <div className='flex flex-col my-2 text-gray-600'>
                  <div className='flex w-fit items-center gap-2 cursor-pointer'>
                    <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
