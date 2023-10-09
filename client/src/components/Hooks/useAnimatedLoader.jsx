import { useState } from 'react';
import '../../index.css'

function useAnimatedLoader() {
    const [loading, setLoading] = useState(false);

    const startAnimatedLoading = () => {
        setLoading(true);
    };

    const stopAnimatedLoading = () => {
        setLoading(false);
    };

    const Loader = () => {
        return loading ? (
            <div className="flex justify-center items-center px-3 bg-discount-gradient rounded-[10px]">
                <table className="text-gradient table-fixed animate-pulse">
                    <tbody>
                        <tr>
                            <td className="px-6 py-4 flex">
                                <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                                <span className='font-bold text-lg mx-3 mt-[2px]'></span>
                            </td>
                            <td>
                                <div className='flex justify-end mr-2'>
                                    <div className="mr-4 rounded-full bg-slate-700 h-10 w-10"></div>
                                    <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 border-b border-gray-300"><div className="w-full h-6 bg-slate-700 rounded"></div></td>
                            <td className="px-6 py-4 border-b border-gray-300 w-[100px]">
                                <div className="w-full h-6 bg-slate-700 rounded"></div>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 border-b border-gray-300"><div className="w-full h-6 bg-slate-700 rounded"></div></td>
                            <td className="px-6 py-4 border-b border-gray-300">
                                <div className="w-full h-6 bg-slate-700 rounded"></div>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 border-b border-gray-300"><div className="w-full h-6 bg-slate-700 rounded"></div></td>
                            <td className="px-6 py-4 border-b border-gray-300">
                                <div className="w-full h-6 bg-slate-700 rounded"></div>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 border-b border-gray-300"><div className="w-full h-6 bg-slate-700 rounded"></div></td>
                            <td className="px-6 py-4 border-b border-gray-300">
                                <div className="w-full h-6 bg-slate-700 rounded"></div>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 border-b border-gray-300"><div className="w-full h-6 bg-slate-700 rounded"></div></td>
                            <td className="px-6 py-4 border-b border-gray-300">
                                <div className="w-full h-6 bg-slate-700 rounded"></div>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 border-b border-gray-300"><div className="w-full h-6 bg-slate-700 rounded"></div></td>
                            <td className="px-6 py-4 border-b border-gray-300">
                                <div className="w-full h-6 bg-slate-700 rounded"></div>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4"><div className="w-full h-6 bg-slate-700 rounded"></div></td>
                            <td className="px-6 py-4">
                                <div className="w-full h-6 bg-slate-700 rounded"></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        ) : null;
    };

    return { loading, startAnimatedLoading, stopAnimatedLoading, Loader };
}

export default useAnimatedLoader;
