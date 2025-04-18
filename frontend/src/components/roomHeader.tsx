import React, { useState } from 'react';
import Input from 'antd/es/input/Input';
import { Button } from 'antd'; // Ant Design Button for a modern look

interface RoomHeaderProps {
    roomCode: string | null;
    isAdminMode?: boolean;
}

const RoomHeader = ({ roomCode: initialRoomCode, isAdminMode = false }: RoomHeaderProps) => {
    const [roomCode, setRoomCode] = useState<string>(initialRoomCode || '');

    // Simulate sending the room code to an endpoint
    const handleRoomAction = () => {
        if (isAdminMode) {
            console.log(`Creating room with code: ${roomCode}`);
            // Replace this with an actual API call for creating a room
            fetch('/api/create-room', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ roomCode }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Room created successfully:', data);
                })
                .catch((error) => {
                    console.error('Error creating room:', error);
                });
        } else {
            console.log(`Joining room with code: ${roomCode}`);
            // Replace this with an actual API call for joining a room
            fetch('/api/join-room', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ roomCode }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Room joined successfully:', data);
                })
                .catch((error) => {
                    console.error('Error joining room:', error);
                });
        }
    };

    return (
        <div className="top-0 left-0 w-full bg-gray-800 text-white z-50 p-4 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex flex-col space-y-2">
                    {isAdminMode && <h1 className="text-2xl font-bold">Admin Mode</h1>}
                    <label className="text-lg">Room Code: {initialRoomCode}</label>
                </div>
                <div className="flex items-center space-x-4">
                    <Input
                        className="w-full md:w-64"
                        placeholder="Enter room code"
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value)}
                    />
                    
                    <Button
                        type="primary"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
                        onClick={handleRoomAction}
                    >
                        join room
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RoomHeader;