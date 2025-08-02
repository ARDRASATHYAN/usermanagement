import React from "react";
import {
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    Pagination as PaginationPrimitive,
} from "./ui/pagination";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange?.(page);
        }
    };

    const getVisiblePages = () => {
        const range = 2;
        let pages = [];

        pages.push(1);

        if (currentPage - range > 2) {
            pages.push("...");
        }

        for (
            let i = Math.max(2, currentPage - range);
            i <= Math.min(totalPages - 1, currentPage + range);
            i++
        ) {
            pages.push(i);
        }

        if (currentPage + range < totalPages - 1) {
            pages.push("...");
        }

        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <PaginationPrimitive>
            <PaginationContent className="flex items-center justify-center space-x-2">
                {/* Prev */}
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => currentPage > 1 && handlePageClick(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`text-sm py-2 px-2 ${currentPage === 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                            }`}
                    />
                </PaginationItem>

                {/* Page Numbers */}
                {getVisiblePages().map((page, index) => (
                    <PaginationItem key={index}>
                        {page === "..." ? (
                            <PaginationEllipsis className="text-sm" />
                        ) : (
                            <PaginationLink
                                isActive={page === currentPage}
                                onClick={() => typeof page === "number" && handlePageClick(page)}
                                className={`text-sm py-1 px-2 ${page === currentPage ? "font-bold bg-gray-200 rounded" : "cursor-pointer"
                                    }`}
                            >
                                {page}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}

                {/* Next */}
                <PaginationItem>
                    <PaginationNext
                        onClick={() =>
                            currentPage < totalPages && handlePageClick(currentPage + 1)
                        }
                        disabled={currentPage === totalPages}
                        className={`text-sm py-2 px-2 ${currentPage === totalPages
                                ? "cursor-not-allowed opacity-50"
                                : "cursor-pointer"
                            }`}
                    />
                </PaginationItem>
            </PaginationContent>
        </PaginationPrimitive>
    );
};
