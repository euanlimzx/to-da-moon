import Input from 'antd/es/input/Input';
import { Button } from 'antd'; // Ant Design Button for a modern look
import { useState } from 'react';
import '@ant-design/v5-patch-for-react-19';

interface RoomHeaderProps {
    roomCode: string | null;
    handleRoomJoin: (roomCode: string) => void;
    isAdminMode?: boolean;
}
const RoomHeader = ({ roomCode, handleRoomJoin, isAdminMode = false }: RoomHeaderProps) => {
    const [ roomCodeInput, setRoomCodeInput ] = useState<string>('');

    return (
        <div className="top-0 left-0 w-full text-white z-50 p-4 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex flex-col space-y-2">
                    {isAdminMode && <h1 className="text-2xl font-bold">Admin Mode</h1>}
                    <label className="text-lg">Room Code: {roomCode}</label>
                </div>
                <div className="flex items-center space-x-4">
                    <Input
                        className="w-full md:w-64"
                        placeholder="Enter room code"
                        value={roomCodeInput}
                        onChange={(e) => setRoomCodeInput(e.target.value)}
                    />
                    
                    <Button
                        type="primary"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
                        onClick={()=>handleRoomJoin(roomCodeInput)}
                    >
                        join room
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RoomHeader;