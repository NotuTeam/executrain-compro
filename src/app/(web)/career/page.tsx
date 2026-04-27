/** @format */

"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Building2,
  MapPin,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Container from "@/components/atomic/container";
import HeroCareer from "@/components/hero/herocareer";
import Button from "@/components/atomic/button";
import SearchBar from "@/components/atomic/careersearchbar";
import CareerGalleryCarousel from "@/components/careergallerycarousel";

import { useCareers } from "@/services/career/hook";
import { isExpired, toList } from "@/lib/utils";
import { CareerProps } from "@/types/career";

const jobTypeLabel: Record<string, string> = {
  FULL_TIME: "Full Time",
  PART_TIME: "Part Time",
  CONTRACT: "Contract",
  INTERNSHIP: "Intern",
  FREELANCE: "Freelance",
};

const jobTypeBadgeClass: Record<string, string> = {
  FULL_TIME: "border border-green-500 text-green-500",
  PART_TIME: "border border-blue-500 text-blue-500",
  CONTRACT: "border border-orange-500 text-orange-500",
  INTERNSHIP: "border border-pink-500 text-pink-500",
  FREELANCE: "border border-purple-500 text-purple-500",
};

const expLevelLabel: Record<string, string> = {
  JUNIOR: "Junior (0–2 years)",
  MID: "Mid-level (3–5 years)",
  SENIOR: "Senior (5+ years)",
  LEAD: "Lead / Principal",
};

export default function CareerPage() {
  const [search, setSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState("ALL");
  const [filterDept, setFilterDept] = useState("ALL");
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data, isLoading } = useCareers({
    sort_order: "desc",
    search: search || undefined,
    experience_level: filterLevel !== "ALL" ? filterLevel : undefined,
    department: filterDept !== "ALL" ? filterDept : undefined,
    page: currentPage,
    limit: itemsPerPage,
  });

  const careers = useMemo<CareerProps[]>(() => data?.data || [], [data]);
  const pagination = useMemo(
    () =>
      data?.pagination || {
        current_page: 1,
        total_pages: 1,
        total_careers: 0,
      },
    [data],
  );
  const totalPages = pagination.total_pages || 1;

  const departmentOptions = useMemo(() => {
    const uniqueDepartments = Array.from(
      new Set(
        careers
          .map((job) => job.department?.trim())
          .filter((department): department is string => !!department),
      ),
    );

    return ["ALL", ...uniqueDepartments];
  }, [careers]);

  const publishedJobs = useMemo(
    () => careers.filter((job) => job.status === "PUBLISHED"),
    [careers],
  );

  const selectedJob = useMemo(
    () =>
      publishedJobs.find((job) => job._id === selectedJobId) ||
      publishedJobs?.[0] ||
      null,
    [publishedJobs, selectedJobId],
  );

  const effectiveSelectedJobId = useMemo(() => {
    if (publishedJobs.length === 0) return null;

    const selectedStillExists = publishedJobs.some(
      (job) => job._id === selectedJobId,
    );

    return selectedStillExists ? selectedJobId : publishedJobs[0]._id;
  }, [publishedJobs, selectedJobId]);

  return (
    <Container>
      <HeroCareer />
      <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] py-8 space-y-5 mt-[8%]">
        <h1 className="text-center font-semibold text-2xl! md:text-5xl!">
          What Sets Us Apart
        </h1>
        <p className="text-center font-semibold">
          {"We don't just offer jobs. We build careers that matter."}
        </p>
        <div className="flex gap-3 flex-col md:flex-row">
          {[
            {
              title: "Continuous Growth Culture",
              description:
                "We invest in ongoing learning and development to help our people stay ahead in a fast-changing industry.",
            },
            {
              title: "Collaborative Environment",
              description:
                "We believe in teamwork, synergy, and open communication to achieve shared success.",
            },
            {
              title: "Purpose-Driven Work",
              description:
                "Every program we deliver creates real impact—empowering professionals and transforming organizations.",
            },
          ].map(
            (each: { title: string; description: string }, index: number) => (
              <div
                key={index + 1}
                className="border border-primary-600 rounded-lg p-5 flex flex-1 gap-3"
              >
                <div>
                  <span className="text-primary-600 font-bold border border-primary-600 rounded-full aspect-square w-8 flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <span className="font-semibold mb-2 block">{each.title}</span>
                  <p className="text-sm">{each.description}</p>
                </div>
              </div>
            ),
          )}
        </div>
      </section>
      <div className="w-full px-[5%] md:px-[7%] lg:px-[10%] pt-[5%]">
        <h2 className="text-2xl! md:text-5xl! font-semibold leading-tight text-center mb-5">
          Explore career opportunities at
          <span className="text-primary-600"> ExecuTrain</span>.
        </h2>
      </div>
      <div className="w-full px-[5%] md:px-[7%] lg:px-[10%] pb-[5%]">
        <SearchBar
          searchValue={search}
          onSearchChange={(value) => {
            setSearch(value);
            setCurrentPage(1);
          }}
          levelValue={filterLevel}
          onLevelChange={(value) => {
            setFilterLevel(value);
            setCurrentPage(1);
          }}
          deptValue={filterDept}
          onDeptChange={(value) => {
            setFilterDept(value);
            setCurrentPage(1);
          }}
          departmentOptions={departmentOptions}
        />
      </div>
      <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] ">
        {isLoading ? (
          <div className="text-center py-10">
            <div className="inline-block w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-gray-600">Loading careers...</p>
          </div>
        ) : (
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              {pagination.total_careers || publishedJobs.length} Vacancy
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4 bg-white rounded-xl h-fit">
                {publishedJobs.length === 0 ? (
                  <p className="text-sm text-gray-600 min-h-[200px] flex items-center justify-center">
                    Tidak ada lowongan yang sesuai
                  </p>
                ) : (
                  <div className="space-y-3">
                    {publishedJobs.map((job) => {
                      const isSelected = effectiveSelectedJobId === job._id;
                      const expired = isExpired(job.deadline);

                      return (
                        <button
                          key={job._id}
                          type="button"
                          onClick={() => setSelectedJobId(job._id)}
                          className={`w-full text-left rounded-xl border p-4 transition-all cursor-pointer ${
                            isSelected
                              ? "border-primary-600 bg-primary-50/40 shadow"
                              : "border-gray-200 bg-white hover:border-gray-400 hover:shadow"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <p className="font-semibold text-gray-900 max-w-[65%] text-ellipsis">
                              {job.title || "-"}
                            </p>
                            <p
                              className={`text-xs px-2 py-1 rounded-md font-medium flex flex-nowrap ${
                                jobTypeBadgeClass[job.job_type || ""] ||
                                "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {jobTypeLabel[job.job_type || ""] ||
                                job.job_type ||
                                "-"}
                            </p>
                          </div>

                          <div className="mt-2 text-xs text-gray-600 space-y-3">
                            <p className="flex items-center gap-2">
                              <Building2 className="w-4 h-4" /> ExecuTrain
                            </p>
                            <p className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />{" "}
                              {job.location || "-"}
                            </p>
                          </div>

                          {expired && (
                            <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-primary-600 text-white">
                              Expired
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {totalPages > 1 && (
                  <div className="mt-4 flex items-center justify-center gap-3">
                    <button
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="p-1 text-black disabled:opacity-40 disabled:cursor-not-allowed"
                      type="button"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    <div className="flex items-center gap-2">
                      {(totalPages <= 4
                        ? Array.from({ length: totalPages }, (_, i) => i + 1)
                        : currentPage <= 2
                          ? [1, 2, 3, "ellipsis"]
                          : currentPage >= totalPages - 1
                            ? [
                                "ellipsis",
                                totalPages - 2,
                                totalPages - 1,
                                totalPages,
                              ]
                            : [
                                "ellipsis",
                                currentPage - 1,
                                currentPage,
                                currentPage + 1,
                                "ellipsis",
                              ]
                      ).map((item, index) => (
                        <button
                          key={`${item}-${index}`}
                          onClick={() =>
                            typeof item === "number" && setCurrentPage(item)
                          }
                          disabled={item === "ellipsis"}
                          className={`w-10 h-10 rounded-full border text-sm font-semibold transition-colors ${
                            item === "ellipsis"
                              ? "border-black bg-[#f5f5f5] text-black cursor-default"
                              : item === currentPage
                                ? "border-black bg-black text-white"
                                : "border-black bg-white text-black"
                          }`}
                          type="button"
                        >
                          {item === "ellipsis" ? "..." : item}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="p-1 text-black disabled:opacity-40 disabled:cursor-not-allowed"
                      type="button"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                )}
              </div>

              <div className="lg:col-span-8 bg-white border rounded-xl">
                {selectedJob ? (
                  <>
                    <section className="p-5 md:p-6">
                      <div className="flex gap-2 items-center">
                        <Image
                          src="/logo-simple-red.png"
                          alt="logo"
                          width={20}
                          height={10}
                        />
                        <p className="text-gray-600 text-md tracking-wide">
                          ExecuTrain
                        </p>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-3">
                        <p className="text-2xl flex-1 md:text-3xl font-bold text-gray-900">
                          {selectedJob.title}
                        </p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                            jobTypeBadgeClass[selectedJob.job_type || ""] ||
                            "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {jobTypeLabel[selectedJob.job_type || ""] ||
                            selectedJob.job_type ||
                            "-"}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-col flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
                        <p className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />{" "}
                          {selectedJob.location || "-"}
                        </p>
                        <p className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />{" "}
                          {expLevelLabel[selectedJob.experience_level || ""] ||
                            selectedJob.experience_level ||
                            "-"}
                        </p>
                      </div>
                    </section>
                    <section className="border-y p-5 md:p-6 space-y-2">
                      <span className="font-semibold block">Apply Now</span>
                      <p className="text-xs">
                        Kirim CV dan Resume ke email:{" "}
                        <strong>
                          {selectedJob.contact_email
                            ? selectedJob.contact_email
                            : "talent@executrain.co.id"}
                        </strong>
                      </p>
                    </section>
                    <section className="p-5 md:p-6 space-y-2">
                      <p className="font-semibold text-gray-900 ">
                        Job Description
                      </p>
                      {toList(selectedJob.description).length > 0 && (
                        <div className="text-xs">
                          <p>Job Requirement : </p>
                          <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                            {toList(selectedJob.description).map(
                              (item, index) => (
                                <li key={`desc-${index}`}>{item}</li>
                              ),
                            )}
                          </ul>
                        </div>
                      )}
                      {toList(selectedJob.requirements).length > 0 && (
                        <div className="text-xs">
                          <p>Job Description : </p>
                          <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                            {toList(selectedJob.requirements).map(
                              (item, index) => (
                                <li key={`req-${index}`}>{item}</li>
                              ),
                            )}
                          </ul>
                        </div>
                      )}
                      {toList(selectedJob.applicant_question).length > 0 && (
                        <div className="text-xs">
                          <p>Application Question(s) : </p>
                          <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                            {toList(selectedJob.applicant_question).map(
                              (item, index) => (
                                <li key={`question-${index}`}>{item}</li>
                              ),
                            )}
                          </ul>
                        </div>
                      )}
                      <p className="text-xs">
                        Job Type :{" "}
                        {jobTypeLabel[selectedJob.job_type || ""] ||
                          selectedJob.job_type ||
                          "-"}
                      </p>
                      {toList(selectedJob.experiance_requirement).length >
                        0 && (
                        <div className="text-xs">
                          <p>Experience : </p>
                          <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                            {toList(selectedJob.experiance_requirement).map(
                              (item, index) => (
                                <li key={`exp-${index}`}>{item}</li>
                              ),
                            )}
                          </ul>
                        </div>
                      )}
                    </section>
                  </>
                ) : (
                  <div className="text-sm text-gray-600 flex items-center justify-center min-h-[200px]">
                    Pilih lowongan untuk melihat detail
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
      <div className="w-full px-[5%] md:px-[7%] lg:px-[10%] text-center py-[10%] md:pb-[5%] space-y-5 md:space-y-8 flex flex-col items-center">
        <h2 className="text-[32px] md:text-[40px] lg:text-[49px] font-semibold">
          {"Can’t find the role you’re looking for?"}
        </h2>
        <p className="text-[14px] md:text-[16px]">
          Send your CV and resume to our email.
        </p>
        <Button
          onClick={() => {}}
          label="Send Your Application"
          rounded
          type="primary"
        />
      </div>
      <CareerGalleryCarousel />
    </Container>
  );
}
