import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react'
import { MoviesContext } from '../../context/MoviesContext';

export default function PopularPagination() {
   const { currentPopularPage, setCurrentPopularPage , totalPopularPages, scrollToTop } = useContext(MoviesContext)

    // دالة تساعدنا نحدد الصفحات اللي هتظهر
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5; // أقصى عدد صفحات عايز تظهره في النص

        if (totalPopularPages <= maxVisible) {
            // لو الصفحات قليلة (مثلاً 5 أو أقل) نعرضهم كلهم
            for (let i = 1; i <= totalPopularPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1); // أول صفحة

            if (currentPopularPage > 3) {
                pages.push("..."); // فاصل
            }

            // الصفحات حوالين currentPopularPage
            const start = Math.max(2, currentPopularPage - 1);
            const end = Math.min(totalPopularPages - 1, currentPopularPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPopularPage < totalPopularPages - 2) {
                pages.push("...");
            }

            pages.push(totalPopularPages); // آخر صفحة
        }

        return pages;
    };
    return (
        <div className="flex justify-center mt-10">
            <nav aria-label="Page navigation example">
                <ul className="flex items-center gap-2 text-base font-medium">
                    {/* Previous Button */}
                    <li>
                        <button
                            onClick={() => { setCurrentPopularPage(prev => Math.max(prev - 1, 1)); scrollToTop() }}
                            className="flex items-center cursor-pointer justify-center w-10 h-10 rounded-full bg-[#FFE353]
                                            border border-yellow-300 shadow hover:bg-yellow-400 transition"
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                    </li>

                    {/* Dynamic Page Numbers */}
                    {getPageNumbers().map((page, index) => (
                        <li key={index}>
                            {page === "..." ? (
                                <span className="px-3 h-10 flex items-center text-gray-500">...</span>
                            ) : (
                                <button
                                    onClick={() => { setCurrentPopularPage(page); scrollToTop() }}
                                    className={`flex items-center justify-center w-10 h-10 cursor-pointer rounded-full border shadow transition  
                                ${currentPopularPage === page
                                            ? "bg-yellow-500 text-white border-yellow-500"
                                            : "bg-[#FFE353] text-black border-yellow-300 hover:bg-yellow-400"}`}
                                >
                                    {page}
                                </button>
                            )}
                        </li>
                    ))}

                    {/* Next Button */}
                    <li>
                        <button
                            onClick={() => { setCurrentPopularPage(prev => Math.min(prev + 1, totalPopularPages)); scrollToTop() }}
                            className="flex items-center justify-center cursor-pointer w-10 h-10 rounded-full bg-[#FFE353]
                                        border border-yellow-300 shadow hover:bg-yellow-400 transition"
                        >
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
