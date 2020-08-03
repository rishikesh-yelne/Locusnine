-- Create Database LocusnineDB
USE [master]
GO

/****** Object:  Database [LocusnineDB] ******/
CREATE DATABASE [LocusnineDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'LocusnineDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\LocusnineDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'LocusnineDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\LocusnineDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO


-- Create Login locuser
USE [master]
GO

/****** Object:  Login [locuser] ******/
CREATE LOGIN [locuser] WITH PASSWORD=N'locusnine', DEFAULT_DATABASE=[LocusnineDB], DEFAULT_LANGUAGE=[us_english], CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF
GO

USE [LocusnineDB]
GO
CREATE USER [locuser] FOR LOGIN [locuser]
GO
USE [LocusnineDB]
GO
ALTER ROLE [db_owner] ADD MEMBER [locuser]
GO

-- Create Table tblUsers
USE [LocusnineDB]
GO

/****** Object:  Table [dbo].[tblUsers] ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblUsers](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
	[email] [varchar](50) NOT NULL,
	[roleType] [varchar](50) NOT NULL,
	[mobileNumber] [varchar](10) NULL,
	[status] [int] NULL,
 CONSTRAINT [PK_tblUsers] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


