import * as React from "react";
import { useEffect, useState } from "react";

type PaginationProps = {
	pageCount: number;
	onPageChange?: (arg0: number) => void;
	className?: string;
};
export const Pagination = (props: PaginationProps) => {
	const [currentPage, setCurrentPage] = useState(0);
	const [pageCount, setPageCount] = useState(1);

	useEffect(() => {
		setPageCount(props.pageCount);
		changePage(0);
		// eslint-disable-next-line
	}, [props.pageCount]);

	const changePage = (page: number) => {
		if (page >= 0 && page < props.pageCount) {
			setCurrentPage(page);
			if (props.onPageChange) {
				props.onPageChange(page);
			}
		}
	};
	return (
		<div>
			<ul className={"pagination" + (props.className ? " " + props.className : "")}>
				<li>
					<button onClick={() => changePage(currentPage - 1)} className="btn btn-flat white-text"><i
						className="material-icons">chevron_left</i></button>
				</li>
				{currentPage > 0 ?
					<li>
						<button onClick={() => changePage(currentPage - 1)}
						        className="btn btn-flat white-text">{currentPage}</button>
					</li>
					:
					<li>
						<button className="btn btn-flat white-text disabled"/>
					</li>
				}
				<li className="active">
					<button className="btn btn-flat white-text">{currentPage + 1}</button>
				</li>
				{currentPage < pageCount - 1 ?
					<li>
						<button onClick={() => changePage(currentPage + 1)}
						        className="btn btn-flat white-text">{currentPage + 2}</button>
					</li>
					:
					<li>
						<button className="btn btn-flat white-text disabled"/>
					</li>
				}
				<li>
					<button onClick={() => changePage(currentPage + 1)} className="btn btn-flat white-text"><i
						className="material-icons">chevron_right</i></button>
				</li>
			</ul>
		</div>
	);
};
